import React, { useEffect } from 'react'

export const Submit = ({ state, setState, timeout = 2200, isDisabled = false }) => {

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

      <button type="submit" id="subButton"
        className={`ui teal button ${(isDisabled) && 'disabled'}`}
      >@(Подтвердить)</button>

      {Boolean(state) && <div className="top right ui toast-container">
        <div className="floating toast-box compact transition visible" onClick={close}>
          <div className="neutral ui toast compact visible">
            <div className="content">
              <p>{(state && typeof state === 'string') ? state : "@(Выполнено)"}</p>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}
