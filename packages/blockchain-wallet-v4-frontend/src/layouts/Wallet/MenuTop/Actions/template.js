import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Media, Text, IconButton } from 'blockchain-info-components'
import { spacing } from 'services/StyleService'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  width: auto;
  margin-top: 0px;
  ${Media.tablet`
    margin-top: 8px;
  `};
`
const ActionButton = styled(IconButton)`
  ${Media.mobile`
    padding: 10px 10px;
    div:last-of-type {
      font-size: 13px;
    }
  `};
`

const Actions = ({
  handleSend,
  handleRequest,
  sendAvailable,
  requestAvailable
}) => (
  <Wrapper>
    <ActionButton
      name='send'
      disabled={!sendAvailable}
      onClick={handleSend}
      min='100px'
      data-e2e='sendButton'
    >
      <Text size='14px' weight={400}>
        <FormattedMessage
          id='layouts.wallet.menutop.send'
          defaultMessage='Send'
        />
      </Text>
    </ActionButton>
    <ActionButton
      style={spacing('ml-15')}
      disabled={!requestAvailable}
      name='request'
      onClick={handleRequest}
      min='100px'
      data-e2e='requestButton'
    >
      <Text size='14px' weight={400}>
        <FormattedMessage
          id='layouts.wallet.menutop.request'
          defaultMessage='Request'
        />
      </Text>
    </ActionButton>
  </Wrapper>
)

Actions.propTypes = {
  sendAvailable: PropTypes.bool.isRequired,
  requestAvailable: PropTypes.bool.isRequired,
  handleSend: PropTypes.func.isRequired,
  handleRequest: PropTypes.func.isRequired
}

export default Actions
