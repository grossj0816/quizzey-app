export const courseListHandler = () => {
    const myCourseList = [
        {
            courseId: 1,
            name: "Human Anatomy & Physiology",
            org: "SUNY Cobleskill",
            textbook: "Human Anatomy & Physiology Version 1"
        },
        {
            courseId: 2,
            name: "Paramedic Field Clinical",
            org: "SUNY Cobleskill",
            textbook: "Paramedic Field Clinical Version 1"
        },
        {
            courseId: 3,
            name: "Paramedic Hospital Clinical",
            org: "SUNY Cobleskill",
            textbook: "Paramedic Hospital Clinical Version 1"
        },
        {
            courseId: 4,
            name: "Paramedic Lab ",
            org: "SUNY Cobleskill",
            textbook: "Paramedic Lab Version 1"
        }
    ];

    return myCourseList;
}


export const quizzeySetHandler = () => {
    const quizzeySets = [
        {
            setId: 1,
            name: "Human Anatomy Chapter 1",
            count: 20,
            userName: "Elly"
        },
        {
            setId: 2,
            name: "Human Anatomy Chapter 2",
            count: 18,
            userName: "Elly"
        },
        {
            setId: 3,
            name: "Human Anatomy Chapter 3",
            count: 30,
            userName: "Elly"
        },
        {
            setId: 4,
            name: "Human Anatomy Chapter 4",
            count: 10,
            userName: "Elly"
        }
    ];
    return quizzeySets;
}