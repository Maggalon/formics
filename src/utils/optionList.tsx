import { 
    AtSign, 
    Text,
    Phone,
    Star,
    Binary,
    AlignStartVertical,
    CheckCheck} from "lucide-react"

export const optionList = [
    {
        icon: <Text />,
        text: "Short text",
        type: "short-text"
    },
    {
        icon: <Text />,
        text: "Long text",
        type: "long-text"
    },
    {
        icon: <AtSign />,
        text: "Email",
        type: "email"
    },
    {
        icon: <Phone />,
        text: "Phone",
        type: "phone"
    },
    {
        icon: <Star />,
        text: "Star rating",
        type: "star-rating"
    },
    {
        icon: <Binary />,
        text: "Opinion scale",
        type: "opinion-scale"
    },
    {
        icon: <AlignStartVertical />,
        text: "Drag-and-drop ranking",
        type: "ranking"
    },
    {
        icon: <CheckCheck />,
        text: "Multiple choice",
        type: "multiple-choice"
    },
]