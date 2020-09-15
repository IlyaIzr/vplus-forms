import React from 'react'

export const InvestorField = ({ field, changeFunc }) => {
  return (
    <div className="ui three fields">
      <div className="required field">
        <label htmlFor="id">Пользователь</label>
        <select name="id" className="ui dropdown"
          required onChange={changeFunc}
          value={field.currentOption.id}
        >
          {field.options.length && field.options.map((investor) => {
            return (
              <option value={investor.id} key={investor.id}>{investor.name}</option>
            )
          })}
        </select>
      </div>

      <label htmlFor="share">Доля</label>
      <input type="range" name="share" min="1" className="ui range"
        value={field.currentOption.share} onChange={changeFunc}
      />
      <div>{field.currentOption.share + ' %'}</div>
    </div>
  )
}
