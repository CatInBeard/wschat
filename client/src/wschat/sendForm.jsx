const SendForm = ({ sendAction }) => {
    const submit = (event) => {
        event.preventDefault();
        let messageText = event.target.elements.text.value;
        sendAction({text: messageText});
    }
    return <form onSubmit={submit}>
        <div className="form-group mt-2">
            <textarea name="text" className="form-control"></textarea>
        </div>
        <div className="form-group mt-2">
            <input className="btn btn-primary" type="submit" value={"send"} />
        </div>
    </form>
}

export default SendForm;