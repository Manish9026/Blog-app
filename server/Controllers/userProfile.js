import { userModel } from '../Models/userModel.js';
import { AuthTools } from './userAuth.js'

class userProfile extends AuthTools {


    static updateProfile = async (req, res) => {
        try {

            const { userId } = await this.getUserId(req);
            const { type, newValue } = req.query;
            let { field } = req.body;
            let obj = Object.entries(field)



            console.log(userId, req.query, req.body);
            const getUpdateData = async (setField, setRefField) => {
                return await userModel.findOne({ _id: userId }, setField, { new: true }).populate({
                    path: "profile",
                    select: setRefField
                }).then((result) => {
                    console.log(result);
                    if (type == "bio") {
                        result.profile.userBio = newValue;
                        return result.profile.save()
                    }
                    else if (type == "personal") {
                        console.log(field);
                        if (obj[0][0] == "userName" || obj[0][0] == "userEmail") {
                            console.log("called");
                            result[obj[0][0]] = obj[0][1];
                            return result.save();
                        }
                        else if (obj[0][0] == "DOB") {

                            const date = new Date(obj[0][1])
                            console.log(date);
                            result.profile.personal[obj[0][0]] = date;

                            // Promise.all()
                            result.profile.save();
                            return result.save();
                        }
                        else {
                            // console.log(result.profile.personal[obj[0][0]]);
                            if (!result.profile.personal[obj[0][0]]) {
                                result.profile.personal[obj[0][0]] = obj[0][1];
                                result.profile.save();
                                return result.save();
                            } else {
                                result.profile.personal[obj[0][0]] = obj[0][1];

                                // Promise.all()
                                result.profile.save();
                                return result.save();
                            }

                        }
                    }
                    // result.profile.userBio="hello i am manish maurya"


                })
            }


            const updateBio = async () => {
                try {
                    let data = await getUpdateData({ "profile": 1, "userName": 1 }, { "userBio": 1 })
                    if (data) {
                        req.status(201).json({
                            message: "update successfully",
                            data,
                            status: true

                        })
                    }
                    else {
                        req.status(201).json({
                            message: "update successfully",
                            data: [],
                            status: false

                        })
                    }


                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            const updatePersonal = async () => {
                try {
                    const data = await getUpdateData({ "userName": 1, "userEmail": 1, "profile": 1 }, { "personal": 1 })
                    if (data) {
                        res.status(201).json({
                            message: "successfully updated",
                            status: true,
                            data,
                        }
                        )
                    }
                    else {
                        res.status(201).json({
                            message: "try again",
                            status: false,
                            data: [],
                        }
                        )
                    }

                } catch (error) {
                    console.log(error);
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            const updateEdu = async () => {
                try {

                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }


            switch (type) {
                case "bio": updateBio();
                    break;
                case "personal": updatePersonal();
                    break
                case "education": updateEdu();
                    break;
                case "family"://*updateFamilyInfo();
                    break;
                case "other": //*updateUserOtherInfo();
                    break;

                default:// default statement
            }


        } catch (error) {

        }
    }

    static getProfileData = async (req, res) => {
        try {
            // console.log(req);
            const { userId } = await this.getUserId(req)
            const { type } = req.query;


            console.log(userId);
            // public function 
            const getUserData = async (setField, setRefField) => {
                try {

                    console.log(setField, setRefField);

                    return await userModel.findOne({ _id: userId }, setField).populate({
                        path: "profile",
                        select: setRefField
                    }).then(result => {
                        return result
                    }).catch(error => {
                        res.json({
                            message: "facing some issue try after some time",
                            status: false,
                            error
                        })
                    })


                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            //    private function
            const getBio = async () => {
                try {
                    const data = await getUserData({ "profile": 1, "userName": 1 }, { "userBio": 1 })
                    console.log(data);
                    if (data) {
                        res.status(201).json({
                            status: true,
                            data,
                            message: "successfully get bio "
                        })
                    }
                    else {
                        res.status(201).json({
                            status: false,

                        })
                    }

                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            const getPersonal = async () => {
                try {

                    const data = await getUserData(["userName", "userEmail", "profile"], ["personal"]);
                    if (data) {
                        res.status(201).json({
                            status: true,
                            data,
                            message: "successfully get bio "
                        })
                    }
                    else {
                        res.status(201).json({
                            status: false,

                        })
                    }
                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            const getEducation = async () => {
                try {

                    const data = await getUserData(["profile"], ["education"])
                    if (data) {
                        res.status(201).json({
                            status: true,
                            data,
                            message: "successfully get bio "
                        })
                    }
                    else {
                        res.status(201).json({
                            status: false,

                        })
                    }
                } catch (error) {
                    res.json({
                        message: "facing some issue try after some time",
                        status: false,
                        error
                    })
                }
            }
            if (userId) {

                switch (type) {

                    case "bio": getBio();
                        break;

                    case "personal": getPersonal();
                        break;
                    case "education": getEducation()
                        break;

                    case "familyDetail":
                        // statement
                        break;
                    case "other":// statement
                        break;

                    default:// statement
                        break;
                }

            } else {

                res.json({
                    message: "please login again",
                    status: 0,
                })

            }





        } catch (error) {
            res.json({
                message: "facing some issue try after some time",
                status: false,
                error
            })
        }
    }
}

export { userProfile }