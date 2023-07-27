import { Host } from "./host.interface";
import { InvitationMeeting } from "./invitation-meeting.interface";

export interface Invitation {

    id: string;

    host: Host;

    meeting: InvitationMeeting;

    visitor_name: string;

    visitor_nric: string;

    visitor_email: string;

    visitor_phone: string;

    is_preregistered: boolean;

    in_time: Date;

    out_time: Date;

}