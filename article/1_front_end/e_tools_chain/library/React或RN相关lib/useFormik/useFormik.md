# Notice

- 如果要让字段访问时，会提示错误，需要 touched, name, onBlur

  ```react
  import { useFormik } from 'formik'
  const formik = useFormik(...)
  const {values, errors, touched, handleBlur} = formik
  <input
      className='rfq-quote-request-text-input'
      onBlur={handleBlur}
      name='price'
      onValueChange={priceValue => {
          handleChange('price')(priceValue.value)
      }}
      value={values.price}
  />
  {touched.price && errors.ticker && 
   	(<span style={{ color: 'red' }}>{errors.price}</span>)
  }      
  
  ```

  

