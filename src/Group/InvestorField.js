import React from 'react'

export const InvestorField = ({ field, options, changeFunc, index, removeFunc, isDeletable }) => {
  const onChange = e => changeFunc(e, index)
  const onClick = () => removeFunc(index)

  return (
    <div className="ui four fields">
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
      <input type="range" name="share" className="ui range"
        value={field.share} onChange={onChange}
      />
      <div className="field">{field.share + ' %'}</div>
      <div className="field">
        <button className={isDeletable ? "ui button red" : "ui button red disabled"}
          onClick={onClick} type="button"
        >Удалить
        </button>
      </div>
    </div>
  )
}
