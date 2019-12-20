import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import TextField from '@material-ui/core/TextField';



export default class Informacion extends PureComponent {
 

    render() {
        let values = this.props.Informacion
        let d = new Date(values.Created);
        let d1 = new Date(values.Modified);
        return (
            <div className={Styles.Contenedor}>
                <div className={Styles.Datos}>
                    <TextField
                        label="Version"
                        name="Created"
                        fullWidth
                        readOnly
                        value={values.MayorVersion + "." + values.MinorVersion}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div>
                <div className={Styles.Datos}>
                    <TextField
                        label="Creado"
                        name="Created"
                        fullWidth
                        readOnly
                        value={d.toLocaleString()}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div>
                <div className={Styles.Datos}>
                    <TextField
                        label="Creado por"
                        name="CreatedBy"
                        fullWidth
                        readOnly
                        value={values.CreatedBy}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div>
                <div className={Styles.Datos}>
                    <TextField
                        label="Modificado"
                        name="Modified"
                        fullWidth
                        readOnly
                        value={d1.toLocaleString()}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div>
                <div className={Styles.Datos}>
                    <TextField
                        label="Modificado por"
                        name="Created"
                        fullWidth
                        readOnly
                        value={values.ModifiedBy}
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
