import { Invitation } from "./invitation.interface";

export interface InvitationMeeting {

    id: number;

    summary: string;

    description: string;

    start_date: Date;

    end_date: Date;

    purpose: string;

    venue: string;

    invitations: Invitation[];

}