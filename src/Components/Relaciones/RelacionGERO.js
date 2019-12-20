import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import TextField from '@material-ui/core/TextField';


export default class RelacionGERO extends PureComponent {
    
    render() {
        let val = this.props.Value;
        console.log(val);
        return (
            <div key={val.IdRelacion}  className={Styles.ItemRelacion}>
                <div  className={Styles.Contenedor}>
                    <div className={Styles.Datos}>
                        <TextField
                            label="Enfermedad"
                            name="Enfermedad"
                            fullWidth
                            readOnly
                            value={val.NombreEnfermedad }
                            margin="normal"
                            style={{ top: 12 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div   className={Styles.Datos}>
                    <TextField
                            label="Nombre del Gen"
                            name={this.props.Index + "-IdGen"}
                            fullWidth
                            readOnly
                            value={val.NombreGen + " (" + val.OMIMGen + ")" }
                            margin="normal"
                            style={{ top: 12 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div   className={Styles.Datos}>
                    <TextField
                            label="OMIMPhenotype"
                            name={this.props.Index + "-OMIMPhenotype"}
                            fullWidth
                            readOnly
                            value={val.OMIMPhenotype }
                            margin="normal"
                            style={{ top: 12 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={Styles.Contenedor}>
                    <div   className={Styles.Datos}>
                        <TextField
                            label="Phenotype"
                            name="Phenotype"
                            id={this.props.Index + "-Phenotype"}
                            fullWidth
                            readOnly
                            style={{ top: 4}}
                            value={val.Phenotype }
                            margin="normal"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className={Styles.Datos}>
                        <TextField
                            label="Inheritance"
                            id={this.props.Index + "-Inheritance"}
                            name="Inheritance"
                            fullWidth
                            readOnly
                            style={{ top: 4}}
                            value={val.Inheritance }
                            margin="normal"
                            
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className={Styles.Datos}>
                    <TextField
                            label="Estado"
                            id={this.props.Index + "-Estado"}
                            name="Estado"
                            fullWidth
                            readOnly
                            style={{ top: 4}}
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
