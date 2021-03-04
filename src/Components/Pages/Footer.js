import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Footer() {

        return (
            <Typography variant="body2" color="textSecondary" align="center">
              {'Copyright © '}
            
                LDC LOADSHEDDING ATOMATION
             
              {'  '}
              {new Date().getFullYear()}
              {'.'}
              <br></br>
              Design and Developed by Moiz Zoaib {'moiz.zoaib@ke.com.pk'}
            </Typography>
          );
    
}
