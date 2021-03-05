import React, { useEffect, useState } from 'react'
import { Controls } from '../../Components/Controls/Controls';
import UseForm, { Form } from "../../Components/UseForm";
import { Grid ,makeStyles} from '@material-ui/core'
import { getAllBlocks, getGroups, getCategory } from "../Api/api"
const useStyles =  makeStyles( theme => ({
    
    inputControl : {
        
        
        
        '& .MuiOutlinedInput-root' : {
            margin : "0px 5px", 
        }
    
},

    

}))

const initialFValues = {
    LoadSheddingSNO: 0,
    group: "",
    block: "",
    llFeders: 0,
    mlFeeders: 0,
    hlFeeders: 0,
    vhlFeeders: 0,

    totalFeeders: 0,
    spell_1_to_and_From: "",
    spell_2_to_and_From: "",
    spell_3_to_and_From: "",
    spell_4_to_and_From: "",
    spell_5_to_and_From: "",
    spell_6_to_and_From: "",


}
export default function LoadSheddingForm(props) {
    const classes = useStyles();
    const { update, addOrEdit , recordForEdit } = props;
    const { values, setValues, handleChange } = UseForm(initialFValues);
    const [block, setBlock] = useState()
    const [group, setgroup] = useState();
    const [getBlock, setGetBlock] = useState()
    const [getGroup, setgetGroup] = useState()
    const [category, setCategory] = useState()
    const handleSubmit = e => {

        e.preventDefault();
        console.log(values);
         addOrEdit(values);

    }

    console.log(update);
    console.log("LS Form Called")

    useEffect ( ()=> {

        if(recordForEdit != null) {
            setValues({...recordForEdit})
        }
    }, [recordForEdit])

    useEffect(() => {

        console.log("Calling fetchAPi from LSForm")
        const fetchAPI = async () => {
            try {
                console.log(values.block)
                setBlock(await getAllBlocks());


            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        fetchAPI();
    }, []);


    useEffect(() => {

        console.log("Calling get Group  UseEffect from LSForm")
        const setBlock = () => {
            try {
                console.log(values.block)

                // if ( values.block == "") {
                //     console.log(getBlock)
                // }
                // else {
                setGetBlock(values.block)
                //     console.log(getBlock)
                // }

            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        setBlock();
    }, [handleChange]);

    useEffect(() => {

        console.log("Calling getGroup from LSForm")
        const fetchAPI = async () => {
            try {
                console.log(values.block)
                if (values.block == "") {
                    console.log("value is none,")
                    setgroup("");
                }
                else {
                    setgroup(await getGroups(values.block))
                }


            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        fetchAPI();
    }, [getBlock]);


    useEffect(() => {

        console.log("Calling Set Group  UseEffect from LSForm")
        const setGrp = () => {
            try {
                console.log(values.group)

                // if ( values.block == "") {
                //     console.log(getBlock)
                // }
                // else {
                setgetGroup(values.group)
                //     console.log(getBlock)
                // }

            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        setGrp();
    }, [handleChange]);

    useEffect(() => {

        console.log("Calling getCategory from LSForm")
        const fetchAPI = async () => {
            try {
                console.log(values.block, values.group)

                setCategory(await getCategory(values.block, values.group))
                console.log(category)
                category.map(data => {

                    if (data.categoryName == "LL") {
                        console.log("LL Feeders matched " + data.categoryCount)
                        values.llFeders = data.categoryCount
                    }

                    if (data.categoryName == "ML") {
                        console.log("ML Feeders matched " + data.categoryCount)
                        values.mlFeeders = data.categoryCount
                    }
                    if (data.categoryName == "HL") {
                        console.log("HL Feeders matched " + data.categoryCount)
                        values.hlFeeders = data.categoryCount
                    }

                    if (data.categoryName == "VHL") {
                        console.log("VL Feeders matched " + data.categoryCount)
                        values.vhlFeedersFeeders = data.categoryCount
                    }

                }

                )
                setValues({ ...values })
                console.log(`setting values ${values}`)

            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        fetchAPI();
    }, [getGroup]);

    useEffect(() => {

        console.log("Calling sET Category from LSForm")
        const fetchAPI = async () => {
            try {



                console.log(category)
                category.map(data => {

                    if (data.categoryName == "LL") {
                        console.log("LL Feeders matched " + data.categoryCount)
                        values.llFeeders = data.categoryCount
                    }
                    else {
                        values.llFeeders = 0
                    }

                    if (data.categoryName == "ML") {
                        console.log("ML Feeders matched " + data.categoryCount)
                        values.mlFeeders = data.categoryCount
                    }
                    else {
                        values.mlFeeders = 0
                    }
                    if (data.categoryName == "HL") {
                        console.log("HL Feeders matched " + data.categoryCount)
                        values.hlFeeders = data.categoryCount
                    }
                    else {
                        values.hlFeeders = 0
                    }

                    if (data.categoryName == "VHL") {
                        console.log("VL Feeders matched " + data.categoryCount)
                        values.vhlFeeders = data.categoryCount
                    } else {
                        values.vhlFeeders = 0
                    }

                }

                )
                setValues({ ...values })
                console.log(`setting values ${values}`)

            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        fetchAPI();
    }, [category]);

    return (
        <Form onSubmit={handleSubmit}>

            <Grid>
                <Grid container>
                    <Grid item xs={6} >


                            <Controls.Select
                                name="block"
                                label="Select Block"
                                value={values.block}
                                onChange={handleChange}
                                options={block}
                                className = {classes.inputControl}
                            />

                        <Controls.Input
                            variant="outlined"
                            value={values.llFeders}
                            name="llFeders"
                            label="LL Feeders"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"


                            id="llFeeders"

                            Inputprops={{ tabIndex: "1" }}
                            disabled
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.hlFeeders}
                            name="hlFeeders"
                            label="HL Feeders"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"


                            id="hlFeeders"
                            className = {classes.inputControl}
                            Inputprops={{ tabIndex: "1" }}
                            disabled
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.spell_1_to_and_From}
                            name="spell_1_to_and_From"
                            label="SPELL 1 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 1 TO AND FROM"

                            id="spell_1_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}
                        />

                        <Controls.Input
                            variant="outlined"
                            value={values.spell_3_to_and_From}
                            name="spell_3_to_and_From"
                            label="SPELL 3 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 3 TO AND FROM"

                            id="spell_3_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.spell_5_to_and_From}
                            name="spell_5_to_and_From"
                            label="SPELL 5 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 5 TO AND FROM"
                            className = {classes.inputControl}
                            id="spell_5_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}

                        />

                    </Grid>

                    <Grid item xs={6} >
                        <Controls.Select
                            name="group"
                            label="Select Group"
                            value={values.group}
                            onChange={handleChange}
                            options={group}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.mlFeeders}
                            name="mlFeeders"
                            label="ML Feeders"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"


                            id="mlFeeders"

                            Inputprops={{ tabIndex: "2" }}
                            disabled
                            className = {classes.inputControl}
                        /> <Controls.Input
                            variant="outlined"
                            value={values.vhlFeeders}
                            name="vhlFeeders"
                            label="VHL Feeders"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"


                            id="vhlFeeders"

                            Inputprops={{ tabIndex: "2" }}
                            disabled
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.spell_2_to_and_From}
                            name="spell_2_to_and_From"
                            label="SPELL 2 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 2 TO AND FROM"

                            id="spell_2_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}

                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.spell_4_to_and_From}
                            name="spell_4_to_and_From"
                            label="SPELL 4 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 4 TO AND FROM"

                            id="spell_4_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}
                        />
                        <Controls.Input
                            variant="outlined"
                            value={values.spell_6_to_and_From}
                            name="spell_6_to_and_From"
                            label="SPELL 6 TO AND FROM"
                            type="text"
                            size="medium"
                            placeholder=""
                            margin="normal"
                            placeholder="SPELL 6 TO AND FROM"

                            id="spell_6_to_and_From"
                            onChange={handleChange}
                            Inputprops={{ tabIndex: "1" }}
                            className = {classes.inputControl}
                        />




                    </Grid>
                </Grid>
            </Grid>
            
<Grid container justify="flex-end" spacing={1}>
<hr></hr>                        <div>
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
        </Form>
    )
}
