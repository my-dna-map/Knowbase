import React, { PureComponent } from 'react';
import Styles from '../Styles/Forms.module.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export default class RelacionE extends PureComponent {
   
   
    onChanges= e=>{
        
        this.props.Value[e.target.name] =  e.target.value
        this.forceUpdate()
    }

    
    render() {
        let val = this.props.Value;
        let disable = (val.Activo === 0 || val.ReadO === true)?true:false;
        return (
            <div key={val.IdRelacion}  className={Styles.ItemRelacion}>
                <div  className={Styles.Contenedor}>
                    <div className={Styles.Datos}>
                        <TextField
                            label="Panel"
                            name="Panel"
                            fullWidth
                            readOnly
                            disabled={disable}
                            value={val.NombrePanel + " V" + val.Version }
                            margin="normal"
                            style={{ top: 12 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div   className={Styles.Datos}>
                        <Autocomplete
                            id={this.props.Index + "-IdGen"}
                            options={this.props.Genes}
                            getOptionLabel={option =>   option.NombreGen}
                            disabled={disable}
                            name={this.props.Index + "-IdGen"}
                            defaultValue={this.props.Genes[this.props.Genes.findIndex((e) => e.IdGen === val.IdGen)]}
                            onChange={this.props.handler}
                            renderInput={params => (
                                <TextField {...params}  label="Nombre del Gen"  fullWidth
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                    shrink: true,
                                }} />
                            )}
                            />
                    </div>
                    <div   className={Styles.Datos}>
                        <Autocomplete
                            id={this.props.Index + "-IdPhenotype"}
                            options={this.props.Fenotipos}
                            getOptionLabel={option =>   option.OMIMPhenotype.toString()}
                            disabled={disable}
                            name={this.props.Index + "-IdPhenotype"}
                            defaultValue={this.props.Fenotipos[this.props.Fenotipos.findIndex((e) => e.IdPhenotype === val.IdPhenotype)]}
                            onChange={this.props.handler}
                            renderInput={params => (
                                <TextField {...params}  label="OMIM del Fenotipo"  fullWidth
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                    shrink: true,
                                }} />
                            )}
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
                            disabled={disable}
                            style={{ top: 4}}
                            value={val.Phenotype }
                            margin="normal"
                            variant="filled"
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
                            disabled={disable}
                            style={{ top: 4}}
                            value={val.Inheritance }
                            margin="normal"
                            variant="filled"
                            
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className={Styles.Datos}>
                    <FormControl variant="filled" fullWidth style={{top:20}}>
                    <InputLabel id="demo-simple-select-filled-label">Estado</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id={this.props.Index + "-Estado"}
            disabled={disable}
            value={val.Estado}
            onChange={this.props.handlers}
            name={this.props.Index + "-Estado"}
            >
            <MenuItem value="Candidato">Candidato</MenuItem>
            <MenuItem value="Primario">Primario</MenuItem>
            <MenuItem value="Secundario">Secundario</MenuItem>
            <MenuItem value="Eliminado">Eliminado</MenuItem>
            </Select>
            </FormControl>
            </div>
                </div>
            </div>
        )
    }
}
