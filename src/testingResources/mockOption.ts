import { IOptionQuery } from "../interfaces";

const mockOption: IOptionQuery = {
    title: "Test Option",
    description: "Test Option Description",
    creator: {
        id: "TestCreatorId",
        email: "creator@example.com",
        name: "Test Creator"
    },
    refId: "TestOptionRefId",
    userRating: 8,
    result: {
        totalOpposition: 8,
        participationInPercent: 100,
        agreementInPercent: 20
    }
}

export default mockOption;