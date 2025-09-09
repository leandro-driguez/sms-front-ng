export const studentProperties: (keyof Student)[] = [
    "tuitorId",
    "tuitorName", 
    "tuitorPhoneNumber",
    "founds",
    "scholarityLevel",
    "idCardNo",
    "key",
    "name",
    "lastName",
    "phoneNumber",
    "address",
    "dateBecomedMember"
];

export type Student = {
    tuitorId: string,
    tuitorName: string,
    tuitorPhoneNumber: number,
    founds: number,
    scholarityLevel: string,
    idCardNo: string,
    key: string,
    name: string,
    lastName: string,
    phoneNumber: number,
    address: string,
    dateBecomedMember: string
};
