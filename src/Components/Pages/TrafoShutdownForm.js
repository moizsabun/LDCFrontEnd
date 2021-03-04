import React, { useEffect } from 'react'
import { Controls } from '../../Components/Controls/Controls';
import UseForm, { Form } from "../../Components/UseForm";
import { Grid } from '@material-ui/core'


const initialFValues = {
  TrafoShutdownSNO: 0,
  grid : "",
  trafo: "",
  time : "",
  date : "",
  feederAffected : false,
  reason : "",
  rating : "",
  load : "",
  gsm : "",
}
export default function TrafoShutdownForm(props) {
    const {addOrEdit , recordForEdit} =props;
    const { values, setValues,handleChange } = UseForm(initialFValues);
    useEffect ( ()=> {

        if(recordForEdit != null) {
            setValues({...recordForEdit})
        }
    }, [recordForEdit])

 
    

    const handleSubmit = e => {
       
        e.preventDefault();
        console.log(values);
        addOrEdit(values);

    }
    return (
        <Form onSubmit= {handleSubmit}>

            <Grid>
                <Grid container>
                    <Grid item xs={6} >


                    <Controls.Select
                            name="Grid"
                            label="Select Grid"
                            value={values.grid}
                            onChange={handleChange}
                           
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.time}
                            name="time"
                            label="Time (24hrs format)"
                            type="text"
                            size="medium"
                            placeholder="Enter Time"
                            margin="normal"
                            required

                            id="time"
                            onChange={handleChange}
                            inputprops={{ tabIndex: "3" }}
                        />

                        <Controls.Select
                        name="feederAffected"
                        label="Feeder Affected"
                        value={values.feederAffected}
                        onChange={handleChange}
                       
                    />
                    <Controls.Input
                        variant="outlined"
                        value={values.rating}
                        name="rating"
                        label=""
                        type="text"
                        size="medium"
                       disabled
                        margin="normal"
                        required

                        id="rating"
                        onChange={handleChange}
                        inputprops={{ tabIndex: "3" }}
                    />

                    </Grid>

                    <Grid item xs={6} >
                   
                    <Controls.Select
                    name="trafo"
                    label="Select Trafo"
                    value={values.trafo}
                    onChange={handleChange}
                    
                />
                <Controls.DatePicker
                name="Date"
                label = "Enter Shutdown Date"
                value= {values.date}
           
               onChange= {handleChange}
                >
             
        
                </Controls.DatePicker>
                        <Controls.Input
                            variant="outlined"
                            value={values.reason}
                            name="reason"
                            label="Reason"
                            type="text"
                            size="medium"
                            placeholder="Enter Reason"
                            margin="normal"
                            required

                            inputprops={{ tabIndex: "6" }}
                            onChange={handleChange}
                        />
                        <Controls.Select
                        name="load"
                        label="Select Load"
                        value={values.load}
                        onChange={handleChange}
                        
                    /> <Controls.Select
                    name="gsm"
                    label="Select GSM"
                    value={values.gsm}
                    onChange={handleChange}
                    
                />
                        <hr></hr>
                        <div>
                            <Controls.Button

                                type="submit"

                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                disabled={false}
                                inputprops={{ tabIndex: "30" }}
                            >
                                Submit

              </Controls.Button>

                            <Controls.Button

                                type="submit"

                                variant="contained"

                                // className={classes.submit}
                                disabled={false}
                                inputprops={{ tabIndex: "31" }}
                            >
                                Reset

            </Controls.Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    )
}
