import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import moment from "moment/moment";
import { Timestamp } from "@firebase/firestore";

const ModalPrestamos = ({ libro, open, setOpened, prestamos }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpened(false)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle align="center" onClose={() => setOpened(false)}>
                    Préstamos de libro {libro?.nombreLibro}
                </DialogTitle>
                <DialogContent>
                    <ul>
                        {prestamos?.map((e) => {
                            return (
                                <li key={`prestamo${e.id}`}>
                                    Usuario: {e.emailUsuario}, Nombre Libro: {e.nombreLibro}, Fecha: {moment(e.fecha.toDate()).format("DD/MM/YYYY kk:mm:ss")}
                                </li>)
                        })}
                    </ul>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalPrestamos;