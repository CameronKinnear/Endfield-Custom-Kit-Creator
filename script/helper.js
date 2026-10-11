let disableOutputs = false;

function Log(string) {
    /*
        Prints a provided string to the console with
        a prefix
        :string - A string of text
        :return - NULL if disableOutputs is true
                - Outputs to the console the provided string
    */
    if (disableOutputs == true) return null;
    return console.log('DEBUG LOG: ' + string);
}

function ErrorLog(string) {
    /*
        Prints a provided string to the console as
        an error with a prefix 
        :string - A string of text
        :return - NULL if disableOutputs is true
                - Outputs to the console the provided string
    */
    if (disableOutputs == true) return null;
    return console.error('ERROR LOG: ' + string);
}
