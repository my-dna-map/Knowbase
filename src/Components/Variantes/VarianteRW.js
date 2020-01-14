import React, { PureComponent } from 'react'

import TextField from '@material-ui/core/TextField';

export default class VarianteRW extends PureComponent {

    onChanges= e=>{
        
        this.props.Value[e.target.name] =  e.target.value
        this.forceUpdate()
    }
    
    render(){
    let val = this.props.Value;
    console.log(val.cDNA);
        return (
            <div style={{width:"95%",height:"200px",margin:"Auto"}}>
            <div style={{width:"100%",height:"80px",margin:"Auto"}}>
                <div style={{float:"left",width:"18%",marginLeft:"30px"}}>
                    <TextField
                            label="c.DNA"
                            name="cDNA"
                            fullWidth
                            id={this.props.Index + "-cDNA"}
                            value={val.cDNA }
                            onChange = {this.onChanges}
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                                maxLength: 45,
                              }}
                             
                              
                        />
                    </div>
                    <div style={{float:"left",width:"18%",marginLeft:"30px"}}>
                    <TextField
                            label="Proteína"
                            name="Proteina"
                            id={this.props.Index + "-Proteina"}
                            fullWidth
                            onChange = {this.onChanges}
                            value={val.Proteina }
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                                maxLength: 45,
                              }}
                        />
                </div>
                <div style={{float:"left",width:"18%",marginLeft:"30px"}}>
                <TextField
                            label="IdSNV"
                            name="IdSNV"
                            id={this.props.Index + "-IdSNV"}
                            fullWidth
                            onChange = {this.onChanges}
                            value={val.IdSNV }
                            
                            margin="normal"
                            variant="filled"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                                maxLength: 45,
                              }}
                        />
                </div>
                <div style={{float:"left",width:"18%",marginLeft:"30px"}}>
                <TextField
                            label="Clasificación"
                            name="Clasif"
                            id={this.props.Index + "-Clasif"}
                            fullWidth
                            value={val.Clasif }
                            margin="normal"
                            variant="filled"
                            onChange = {this.onChanges}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                                maxLength: 45,
                              }}
                        />
             
                </div>
               
                <div style={{float:"left",width:"18%",marginLeft:"30px"}}>
                <TextField
                            label="PMID"
                            name="PMID"
                            id={this.props.Index + "-PMID"}
                            fullWidth
                            variant="filled"
                            onChange = {this.onChanges}
                            
                            value={val.PMID }
                            margin="normal"
                            inputProps={{
                                maxLength: 45,
                              }}
                            
                              InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>                
            </div>
            <div style={{width:"97%",margin:"auto",height:"120px"}}>
            
                <TextField
                            label="Descripción"
                            name= "Descripcion"
                            id={this.props.Index + "-Descripcion"}
                            fullWidth
                            variant="filled"
                            onChange = {this.onChanges}
                            
                            value={val.Descripcion }
                            margin="normal"
                            rows="3"
                            multiline
                            inputProps={{
                                maxLength: 1024,
                              }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                
            </div>
            </div>
        )
    }
}
