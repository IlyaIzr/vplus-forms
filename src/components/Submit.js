import React, { useEffect } from 'react'

export const Submit = ({ state, setState, timeout = 8200, isDisabled = false }) => {

  const close = () => setState(null)
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        close()
      }, timeout);
    }
  }, [state])

  return (
    <>

      <button type="submit"
        className={`ui teal button ${(isDisabled) && 'disabled'}`}
      >@(Отправить)</button>

      {Boolean(state) && <div className="top right ui toast-container">
        <div className="floating toast-box compact transition visible" onClick={close}>
          <div className="ui green toast compact visible">
            {(state && typeof state === 'string') ? state : "@(Выполнено)"}
          </div>
        </div>
      </div>
      }
    </>
  )
}
