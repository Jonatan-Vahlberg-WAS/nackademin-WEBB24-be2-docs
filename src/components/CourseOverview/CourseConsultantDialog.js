import { cn } from "../../utils/cn";
import Dialog from "../_library/Dialog/TWDialog";
import T from "../_library/Ui/TWTypography";


const CourseConsultantDialog = ({
    open,
    toggle,
    consultant
}) => {

    const imageClasses = cn("w-32 aspect-square rounded-full object-cover");

    return (
        <Dialog open={open} toggle={toggle}>
        <T.PageTitle>Utbildningskonsult</T.PageTitle>
        <img src={consultant.image} alt={consultant.name} className={imageClasses} />
        <T.Text>
          {consultant.name} / {consultant.role}
        </T.Text>
        <a href={`mailto:${consultant.email}`}>    
          {consultant.email}
        </a>
      </Dialog>
    );
};


export default CourseConsultantDialog;