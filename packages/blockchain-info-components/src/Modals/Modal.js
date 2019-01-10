import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { media } from '../MediaSizes'

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => (props.isLast ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background-color: ${props => transparentize(0.5, props.theme['black'])};
  z-index: 1040;
  align-items: center;
  ${media.tablet`
    align-items: flex-start
  `};
`

const BaseModal = styled.div`
  display: ${props => (props.isLast ? 'block' : 'none')};
  position: relative;
  z-index: ${props => (props.type === 'tray' ? 1039 : 1040)};
  background-color: ${props => props.theme['white']};
  border-radius: 4px;
  width: ${props => props.width};
  margin-top: initial;
  box-shadow: 0 5px 15px ${props => transparentize(0.5, props.theme['black'])};
  ${media.tablet`
    width: 100%;
    margin-top: 60px;
    box-shadow: none;
  `};
`

const selectWidth = size => {
  switch (size) {
    case 'auto':
      return 'auto'
    case 'small':
      return '400px'
    case 'medium':
      return '500px'
    case 'large':
      return '600px'
    case 'xlarge':
      return '800px'
    default:
      return '1000px'
  }
}

const Modal = props => {
  const { children, ...rest } = props
  const type = rest.type
  const size = rest.size || 'medium'
  const position = rest.position || 1
  const total = rest.total || 1
  // Props above not defaulted on purpose, so we can see when we forgot to pass them.
  const width = selectWidth(size, position)
  const isLast = total === position

  if (type === 'tray') {
    return (
      <BaseModal isLast={true} position={position} width={width} {...rest}>
        {children}
      </BaseModal>
    )
  } else {
    return (
      <ModalBackground
        isLast={isLast}
        position={position}
        className={rest.class}
      >
        <BaseModal isLast={isLast} position={position} width={width} {...rest}>
          {children}
        </BaseModal>
      </ModalBackground>
    )
  }
}

Modal.propTypes = {
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', ''])
}

export default Modal
