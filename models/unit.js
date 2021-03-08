class Unit{
    constructor(id, userId, buildingId, name, phone, gender, date, price, email, advanceBalance, nextPayment, dues, details) {
        this.id = id;
        this.userId = userId;
        this.buildingId = buildingId;
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        this.date =date;
        this.price = price;
        this.email = email;
        this.advanceBalance = advanceBalance;
        this.nextPayment = nextPayment;
        this.dues = dues;
        this.details = details;
    };
};

export default Unit;