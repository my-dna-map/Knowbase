import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';


export default class RelacionGRO extends PureComponent {
    render() {
        let val = this.props.Value;
        console.log(val.OMIMPhenotype)
        return (
            <div key={val.IdRelacion} style={{width:"90%",margin:"Auto",height:"75px"}}  >
                <div>
                    <div style={{float:"left",width:"8%",marginLeft:"40px"}}>
                    <TextField
                            label="Panel"
                            name="Panel"
                            fullWidth
                            readOnly
                            value={val.NombrePanel + " V" + val.Version }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"24%",marginLeft:"40px"}}>
                        <TextField
                            label="Nombre de la Enfermedad"
                            name={this.props.Index + "-IdGen"}
                            fullWidth
                            readOnly
                            value={val.NombreEnfermedad }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"8%",marginLeft:"40px"}}>
                    <TextField
                            label="OMIMPhenotype"
                            name={this.props.Index + "-OMIMPhenotype"}
                            fullWidth
                            readOnly
                            value={val.OMIMPhenotype }
                            margin="normal"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                    <TextField
                            label="Phenotype"
                            name="Phenotype"
                            id={this.props.Index + "-Phenotype"}
                            fullWidth
                            readOnly
                            
                            value={val.Phenotype }
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                    <TextField
                            label="Inheritance"
                            id={this.props.Index + "-Inheritance"}
                            name="Inheritance"
                            fullWidth
                            readOnly
                            
                            value={val.Inheritance }
                            margin="normal"
                            
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div style={{float:"left",width:"14%",marginLeft:"40px"}}>
                    <TextField
                            label="Estado"
                            id={this.props.Index + "-Estado"}
                            name="Estado"
                            fullWidth
                            readOnly
                            
                            value={val.Estado }
                            margin="normal"
                            
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
