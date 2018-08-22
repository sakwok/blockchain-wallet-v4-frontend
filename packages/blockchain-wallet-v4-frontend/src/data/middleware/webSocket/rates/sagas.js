import { whereEq, map, isEmpty } from 'ramda'
import { put, all, call, select } from 'redux-saga/effects'
import { selectors, model } from 'data'
import * as A from './actions'

export default ({ api, ratesSocket }) => {
  const isSubscribeSuccess = whereEq(model.rates.SUBSCRIBE_SUCCESS_MESSAGE)

  const isSubscribeError = whereEq(model.rates.SUBSCRIBE_ERROR_MESSAGE)

  const isUnsubscribeSuccess = whereEq(model.rates.UNSUBSCRIBE_SUCCESS_MESSAGE)

  const isAdviceMessage = whereEq(model.rates.ADVICE_MESSAGE)

  const onOpen = function*() {}

  const onMessage = function*({ payload: { message } }) {
    if (isSubscribeSuccess(message)) yield put(A.subscribeSuccess(message.pair))
    if (isUnsubscribeSuccess(message))
      yield put(A.unsubscribeSuccess(message.pair))
    if (isSubscribeError(message))
      yield put(A.subscribeError(message.pair, null))
    if (isAdviceMessage(message))
      yield put(A.updateAdvice(message.pair, message.currencyRatio))
  }

  const restFallback = function*() {
    const pairs = yield select(selectors.modules.rates.getActivePairs)
    if (!isEmpty(pairs)) yield all(map(fetchRate, pairs))
  }

  const fetchRate = function*({ pair, config: { volume, fix, fiatCurrency } }) {
    try {
      const advice = yield call(api.fetchRates, pair, volume, fix, fiatCurrency)
      yield put(A.updateAdvice(pair, advice))
    } catch (e) {
      yield put(A.subscribeError(pair, e))
    }
  }

  const onClose = function*(action) {}

  const openChannelForPair = function*({ payload }) {
    const { pair, volume, fix, fiatCurrency } = payload
    if (!volume || !fix || !fiatCurrency) return
    if (ratesSocket.isReady())
      return ratesSocket.send(
        model.rates.getPairSubscribeMessage(pair, volume, fix, fiatCurrency)
      )
    yield call(fetchRate, { pair, config: { volume, fix, fiatCurrency } })
  }

  const closeChannelForPair = function ({ payload }) {
    const { pair } = payload
    if (ratesSocket.isReady())
      ratesSocket.send(model.rates.getPairUnsubscribeMessage(pair))
  }

  return {
    onOpen,
    onMessage,
    onClose,
    restFallback,
    openChannelForPair,
    closeChannelForPair
  }
}
