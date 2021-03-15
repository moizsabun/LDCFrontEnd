import React, { useEffect,useState } from 'react'
import { Controls } from '../../Components/Controls/Controls';
import UseForm, { Form } from "../../Components/UseForm";
import { Grid, makeStyles } from '@material-ui/core'


const useStyles =  makeStyles( theme => ({
    
    inputControl : {
        
        
        
        '& .MuiOutlinedInput-root' : {
            margin : "0px 5px", 
        }
    
},

    

}))
const initialFValues = {
    MasterDataSNO : 0,
    ISLAND: "",
    grid: "",
    GridBlock: "",
    TRAFO: "",
    FeederID: 0,
    Switch_Number: 0,

    Switch_Name: "",
    Switch_Type: "",
    FEEDER_TYPE: "",
    Group: "",
    Category: "", Switch_Make: "",
    Region: "", Cable_Status: "", UFR_SW: "",
    Stage_A: "", Stage_B: "",
    S1: "", S2: "", S3: "", S4: "",S5: "", S6: "", S7: "", S8: "", S9: "", S10: "", S11: "", CAP_OK_MVAR: "", CAP_MVAR: "",
}
export default function MasterDataForm(props) {
    const {addOrEdit , recordForEdit} =props;
    const { values, setValues,handleChange } = UseForm(initialFValues);
    const  [loading, setLoading] = useState(false)
    useEffect ( ()=> {

        if(recordForEdit != null) {
            setValues({...recordForEdit})
        }
    }, [recordForEdit])

 
    

    const handleSubmit = e => {
       
        setLoading(true);
        e.preventDefault();
        console.log(values);
        addOrEdit(values);
        setLoading(false);

    }
    const classes = useStyles();
    return (
     
        <Form onSubmit= {handleSubmit}>

            <Grid>
                <Grid container>
                
                    <Grid item xs={6} >


                        <Controls.Input
                            variant="outlined"
                            value={values.ISLAND}
                            name="ISLAND"
                            label="ISLAND"
                            type="text"
                            size="medium"
                            placeholder="Enter ISLAND Name"
                            margin="normal"
                            required

                            id="ISLAND"
                            onChange={handleChange}
                            inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.GridBlock}
                            name="GridBlock"
                            label="gridblock"
                            type="text"
                            size="medium"
                            placeholder="Enter Grid Block"
                            margin="normal"
                            required

                            id="GridBlock"
                            onChange={handleChange}
                            inputprops={{ tabIndex: "3" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.TRAFO}
                            name="TRAFO"
                            label="Trafo"
                            type="text"
                            size="medium"
                            placeholder="Enter Trafo Name"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "5" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Switch_Type}
                            name="Switch_Type"
                            label="Switch Type"
                            type="text"
                            size="medium"
                            placeholder="Enter Switch Type Here"
                            margin="normal"
                            required   
                            inputprops={{ tabIndex: "7" }}
                            className = {classes.inputControl}


                            onChange={handleChange}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.FEEDER_TYPE}
                            name="FEEDER_TYPE"
                            label="Feeder Type"
                            type="text"
                            size="medium"
                            placeholder="Enter Feeder Type Here"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "9" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.Group}
                            name="Group"
                            label="Group"
                            type="text"
                            size="medium"
                            placeholder="Enter Group Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "11" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.Cable_Status}
                            name="Cable_Status"
                            label="Cable Status"
                            type="text"
                            size="medium"
                            placeholder="Enter Cable Status Here"
                            margin="normal"
                            required

                            inputprops={{ tabIndex: "13" }}
                            onChange={handleChange}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Stage_A}
                            name="Stage_A"
                            label="Stage A 49.4 df/dt"
                            type="text"
                            size="medium"
                            placeholder="Enter Stage A 49.4 df/dt Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "15" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.S1}
                            name="S1"
                            label="49.3(S1)"
                            type="text"
                            size="medium"
                            placeholder="Enter 49.3(S1) Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "17" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S3}
                            name="S3"
                            label="49.0 (S3) 150ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 49.0 (S3) 150ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "19" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S5}
                            name="S5"
                            label="48.6(S5) 50 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.6(S5) 50 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "21" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S7}
                            name="S7"
                            label="48.6(S7)300 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.6(S7) 300 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "23" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.S9}
                            name="S9"
                            label="48.5(S9) 50 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.5(S9)50 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "25" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S11}
                            name="S11"
                            label="48.4(S11)50 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.4(S11) 50 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "27" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.CAP_MVAR}
                            name="CAP_MVAR"
                            label="CAP (Faulty, drop) MVAR"
                            type="text"
                            size="medium"
                            placeholder="Enter CAP (Faulty, drop) MVAR Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "29" }}
                            className = {classes.inputControl}
                        />

                    </Grid>
                
                    <Grid item xs={6} >
                        <Controls.Input
                            variant="outlined"
                            value={values.FeederID}
                            name="FeederID"
                            label="Feeder Id"
                            type="text"
                            size="medium"
                            placeholder="Enter Feeder Id"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "2" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Switch_Number}
                            name="Switch_Number"
                            label="Switch Number"
                            type="text"
                            size="medium"
                            placeholder="Enter Switch Number"
                            margin="normal"
                            required  
                            inputprops={{ tabIndex: "4" }}
                            className = {classes.inputControl}


                            onChange={handleChange}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Switch_Make}
                            name="Switch_Make"
                            label="Switch Make"
                            type="text"
                            size="medium"
                            placeholder="Enter Switch Make Here"
                            margin="normal"
                            required

                            inputprops={{ tabIndex: "6" }}
                            onChange={handleChange}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Switch_Name}
                            name="Switch_Name"
                            label="Switch Name"
                            type="text"
                            size="medium"
                            placeholder="Enter Switch Name Here"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "8" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.Category}
                            name="Category"
                            label="Category"
                            type="text"
                            size="medium"
                            placeholder="Enter Category Here"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "10" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.Region}
                            name="Region"
                            label="Region"
                            type="text"
                            size="medium"
                            placeholder="Enter Region Here"
                            margin="normal"
                            required
                            inputprops={{ tabIndex: "12" }}

                            onChange={handleChange}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.UFR_SW}
                            name="UFR_SW"
                            label="UFR (SW)"
                            type="text"
                            size="medium"
                            placeholder="Enter UFR (SW) Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "14" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.Stage_B}
                            name="Stage_B"
                            label="Stage B 49.4 df/dt"
                            type="text"
                            size="medium"
                            placeholder="Enter Stage B 49.4 df/dt Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "16" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S2}
                            name="S2"
                            label="49.2(S2) 50 ms3"
                            type="text"
                            size="medium"
                            placeholder="Enter 49.2(S2) 50 ms3 Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "18" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S4}
                            name="S4"
                            label="48.8 (S4) 200ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.8 (S4) 200ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "20" }}
                            className = {classes.inputControl}
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.S6}
                            name="S6"
                            label="48.6(S6) 200 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.6(S6) 200 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "22" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.S8}
                            name="S8"
                            label="48.5(S8) 100 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.5(S8) 100 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "24" }}
                            className = {classes.inputControl}
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.S10}
                            name="S10"
                            label="48.4(S10) 100 ms"
                            type="text"
                            size="medium"
                            placeholder="Enter 48.4(S10) 100 ms Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "26" }}
                            className = {classes.inputControl}
                        />


                        <Controls.Input
                            variant="outlined"
                            value={values.CAP_OK_MVAR}
                            name="CAP_OK_MVAR"
                            label="CAP OK MVAR"
                            type="text"
                            size="medium"
                            placeholder="Enter CAP OK MVAR Here"
                            margin="normal"
                            required
                            onChange={handleChange}
                            inputprops={{ tabIndex: "28" }}
                            className = {classes.inputControl}
                        />
                        
                    </Grid>

                  
                </Grid>
            </Grid>
            


<Grid container justify="flex-end" spacing={1}>
<hr></hr>
                        <div>
                            <Controls.Button

                                type="submit"

                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                                disabled={loading}
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
        </Form>
    )
}
