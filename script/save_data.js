/* ============================================
This file is the handler for saving data 
from webpage to the localdetails object
============================================= */

function SaveAllDetails() {
    /*
        The main function for calling all other
        saving related functions
    */
    SaveBasicInfoDetails();
    SaveStatDetails();
    SavePopupDetails('basic');
    SavePopupDetails('battle');
    SavePopupDetails('combo');
    SavePopupDetails('ultimate');
    SavePopupDetails('talent 1');
    SavePopupDetails('talent 2');
}
