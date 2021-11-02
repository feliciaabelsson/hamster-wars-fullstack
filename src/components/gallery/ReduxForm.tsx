import { reduxForm, Field } from "redux-form"
import Input from "./Input"

const renderInput = ({ input, meta }) => (
    <Input {...input} type="text" errorMessage={meta.touched && meta.error} />
)

const ReduxForm = () => {
    (
        <div>
            {/* REDUX-FORM */}
            <Field name="hamster-name" component={renderInput} />
        </div>
    )
}

export default reduxForm({
    form: 'add-hamster-form',
})(ReduxForm)