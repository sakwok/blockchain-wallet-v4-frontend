import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Media, Image, Text, Button } from 'blockchain-info-components'
import PropTypes from 'prop-types'
import { PartnerHeader } from 'components/IdentityVerification'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  ${Media.mobile`
    flex-direction: column;
    height: 100vh;
  `};
`
const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  > div {
    margin: 15px 0px;
  }
  ${Media.mobile`
    width: 100%;
  `};
`
const RightCol = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  ${Media.mobile`
    width: 100%;
  `};
`
const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const DepositsImage = styled(Image)`
  width: 215px;
  ${Media.mobile`
    width: 150px;
  `};
`

const AwaitingDeposits = ({ showModal }) => {
  return (
    <Container>
      <LeftCol>
        <PartnerHeader>
          <FormattedMessage
            id='modals.sfoxexchangedata.link.awaitingdeposits.title'
            defaultMessage='Verify Your Bank Account'
          />
        </PartnerHeader>
        <ImageWrapper>
          <DepositsImage name='micro-deposits-whole' />
        </ImageWrapper>
        <Text size='13px' weight={300}>
          <FormattedMessage
            id='modals.sfoxexchangedata.link.awaitingdeposits.body'
            defaultMessage='To verify your bank details, SFOX will send two micro-deposits to your bank account for a few cents each. Once received, select Enter Deposit Details to finish setting up your account.'
          />
        </Text>
        <Text size='13px' weight={300}>
          <FormattedMessage
            id='modals.sfoxexchangedata.link.awaitingdeposits.note'
            defaultMessage='Bear with us: receiving these deposits can take up to 5 business days.'
          />
        </Text>
      </LeftCol>
      <RightCol>
        <Button
          width='80%'
          nature='primary'
          onClick={() => showModal('SfoxEnterMicroDeposits')}
        >
          <FormattedMessage
            id='awaiting_deposits.enter'
            defaultMessage='Enter Deposit Details'
          />
        </Button>
      </RightCol>
    </Container>
  )
}

AwaitingDeposits.propTypes = {
  showModal: PropTypes.func.isRequired
}

export default AwaitingDeposits
