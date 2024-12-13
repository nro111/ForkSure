interface Customer {
    id: string;
    totalVisits: string;
}

interface Promotion {
    description: string;
    endDateTime: string;
    id: string;
    limit: string;
    startDateTime: string;
    title: string;
}

interface Merchant {
    address: string;
    businessType: string;
    createDateTime: string;
    customers: Customer[];
    emailId: string;
    id: string;
    img: string;
    lastLoginDateTime: string;
    lastUpdatedDateTime: string;
    name: string;
    ownerFirstName: string;
    ownerLastName: string;
    password: string;
    passwordHash: string;
    phone: string;
    promotions: Promotion[];
    subscriptionType: string;
    tokenId: string;
    username: string;
}