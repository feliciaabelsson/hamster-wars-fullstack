
const Input = ({ errorMessage, ...props }) => (
    <div>
        <input {...props} />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
)

export default Input