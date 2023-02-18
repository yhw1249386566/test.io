import { memo } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

function Mood() {
    function onChange(value) {
        console.log('Captcha value:', value)
    }

    return (
        <div>
            <ReCAPTCHA
                sitekey='6Lcf_HEjAAAAALrsMEbmkNT_PywqNZtv7lL0GdX0'
                onChange={onChange}
            />
        </div>
    )
}

export default memo(Mood)
