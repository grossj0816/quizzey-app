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
            courseId: 1,
            name: "Human Anatomy Chapter 1",
            count: 20,
            userName: "Elly"
        },
        {
            setId: 2,
            courseId: 1,
            name: "Human Anatomy Chapter 2",
            count: 18,
            userName: "Elly"
        },
        {
            setId: 3,
            courseId: 1,
            name: "Human Anatomy Chapter 3",
            count: 30,
            userName: "Elly"
        },
        {
            setId: 4,
            courseId: 1,
            name: "Human Anatomy Chapter 4",
            count: 10,
            userName: "Elly"
        }
    ];
    return quizzeySets;
}


export const listQuestionsHandler = () => {
    const questionsList = [
        {
            questionId: 1,
            setId: 1,
            question: "All of the following processes take place in the uterus, EXCEPT?",
            answer: "Fertilization"
        },
        {
            questionId: 2,
            setId: 1,
            question: "Cervical spondylosis is a degenerative change in the cervical spine that causes:",
            answer: "Common causes of bradycardia include?"
        },
        {
            questionId: 3,
            setId: 1,
            question: "Many veteran EMS providers have embraced a leadership role in primary injury prevention after?",
            answer: "witnessing too many episodes of needless suffering"
        },
        {
            questionId: 4,
            setId: 2,
            question: "Prior to unloading a patient from the ambulance, you should:",
            answer: "witnessing too many episodes of needless suffering"
        },
        {
            questionId: 5,
            setId: 2,
            question: "Prior to unloading a patient from the ambulance, you should:",
            answer: "ensure that the patient is secured to the stretcher"
        },
        {
            questionId: 6,
            setId: 2,
            question: "The second impact that occurs when an adult pedestrian is struck by a motor vehicle would MOST likely result in injuries to the:",
            answer: "pelvis and chest"
        },
        {
            questionId: 7,
            setId: 3,
            question: "When communicating with a patient whose cultural background differs from the paramedics, it is MOST important for the paramedic to?",
            answer: "pelvis and chest"
        },
        {
            questionId: 8,
            setId: 3,
            question: "When communicating with a patient whose cultural background differs from the paramedics, it is MOST important for the paramedic to?",
            answer: "treat the patient with utmost respect at all times"
        },
        {
            questionId: 9,
            setId: 3,
            question: "Which of the following statements regarding selective serotonin reuptake inhibitors (RRSIs) is most correct?",
            answer: "SSRIs have fewer anticholinergic and cardiac effects than tricyclics."
        },
        {
            questionId: 10,
            setId: 4,
            question: "Your entire assessment of a patient should:",
            answer: "Appear to be a seamless process"
        },
    ];

    return questionsList;
}