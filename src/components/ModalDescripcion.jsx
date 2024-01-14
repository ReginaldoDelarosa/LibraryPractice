import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import moment from "moment/moment";
import { Timestamp } from "@firebase/firestore";
import { useState } from "react";

const ModalDescripcion = ({ descripcion }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle align="center" onClose={() => setOpen(false)}>
                    Descripción
                </DialogTitle>
                <DialogContent>
                    {descripcion}
                </DialogContent>
            </Dialog>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Mostrar descripción</Button>
        </>
    )
}

export default ModalDescripcion;