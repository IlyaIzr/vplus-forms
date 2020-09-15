import React from 'react'

export const InvestorField = ({ field, options, changeFunc, index }) => {
  const onChange = e => changeFunc(e, index)
  
  return (
    <div className="ui three fields">
      <div className="required field">
        <label htmlFor="id">Пользователь</label>
        <select name="id" className="ui dropdown"
          required onChange={onChange}
          value={field.id}
        >
          {options.length && options.map((investor) => {
            return (
              <option value={investor.id} key={investor.id}>{investor.name}</option>
            )
          })}
        </select>
      </div>

      <label htmlFor="share">Доля</label>
      <input type="range" name="share" min="1" className="ui range"
        value={field.share} onChange={onChange}
      />
      <div>{field.share + ' %'}</div>
    </div>
  )
}
