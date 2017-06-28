import { filter, map, addIndex, prop, view, compose, is, pipe, curry } from 'ramda'
import List from './List'
import * as HDAccount from './HDAccount'
import { iLensProp } from './util'

const mapIndexed = addIndex(map)

export class HDAccountList extends List {}

export const isHDAccountList = is(HDAccountList)

export const selectAccount = curry((index, as) => pipe(HDAccountList.guard, view(iLensProp(index)))(as))

export const selectByXpub = curry((xpub, as) => pipe(HDAccountList.guard, xs => xs.find(HDAccount.isXpub(xpub)))(as))

export const selectContext = pipe(HDAccountList.guard, (accList) => {
  return map(HDAccount.selectXpub, accList)
})

export const selectActive = pipe(HDAccountList.guard, filter(HDAccount.isActive))

export const toJS = pipe(HDAccountList.guard, (accList) => {
  return map(HDAccount.toJS, accList).toArray()
})

export const fromJS = (accounts) => {
  if (is(HDAccountList, accounts)) {
    return accounts
  } else {
    return new HDAccountList(mapIndexed(HDAccount.fromJS, accounts))
  }
}

export const reviver = (jsObject) => {
  return new HDAccountList(jsObject)
}
