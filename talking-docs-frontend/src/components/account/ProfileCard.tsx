import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button
} from "@material-tailwind/react";

type PCProps = {
    username: string;
    imgUrl?: string;
}

const ProfileCard: React.FC<PCProps> = (props) => {
    return (
        <Card className="w-96">
            <CardHeader floated={false} className="h-80">
                <img src={props.imgUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {props.username}
                </Typography>
                <Button variant="gradient" className="w-full my-3">
                    Change Password
                </Button>
                <Button color="red" variant="gradient" className="w-full">
                    Delete Account
                </Button>
            </CardBody>
            
        </Card>
    );
}

export default ProfileCard