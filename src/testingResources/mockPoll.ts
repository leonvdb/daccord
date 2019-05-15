import { IPollQuery } from '../interfaces';

const mockPoll: IPollQuery = {
    title: "Test Poll",
    description: "Description of the Test Poll",
    refId: "TestRefId",
    creatorPseudonym: "Test Creator",
    creator: {
        id: "TestCreatorId",
        email: "creator@example.com",
        name: "Test Creator"
    },
    options: [{
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
    }],
    participants: [{
        pseudonym: "Test Participant",
        user: {
            id: "TestParticipantId",
            email: "participant@example.com",
            name: "Test Participant"
        }
    }]
}

export default mockPoll;