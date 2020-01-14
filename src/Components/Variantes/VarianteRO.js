import React, { PureComponent } from 'react'

import TextField from '@material-ui/core/TextField';

export default class VarianteRO extends PureComponent {
    render(){
    let val = this.props.Value;
        return (
            <div style={{width:"95%",height:"74px",margin:"Auto"}}>
                <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                    <TextField
                            label="cDNA"
                            name="c.DNA"
                            fullWidth
                            readOnly
                            value={val.cDNA }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                    <TextField
                            label="Proteína"
                            name={"Proteina"}
                            fullWidth
                            readOnly
                            value={val.Proteina }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>
                <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                <TextField
                            label="IdSNV"
                            name={"IdSNV"}
                            fullWidth
                            readOnly
                            value={val.IdSNV }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>
                <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                <TextField
                            label="Clasificación"
                            name="Clasif"
                            id={this.props.Index + "-Phenotype"}
                            fullWidth
                            readOnly
                            
                            value={val.Clasif }
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>
                <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                <TextField
                            label="Descripción"
                            id={this.props.Index + "-Inheritance"}
                            name="Inheritance"
                            fullWidth
                            readOnly
                            
                            value={val.Descripcion }
                            margin="normal"
                            
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>
                <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                <TextField
                            label="PMID"
                            id={this.props.Index + "-Estado"}
                            name="Estado"
                            fullWidth
                            readOnly
                            
                            value={val.PMID }
                            margin="normal"
                            
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                </div>                
            </div>
            
        )
    }
}
