import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseLectureData: [],
    completedLectureData: [],
    fullCourseData:null,
    totalLectures:0
};

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseLectureData(state , action){
            state.courseLectureData = action.payload;
        },
        setCompletedLectureData(state , action){
            state.completedLectureData = action.payload;
        },
        setFullCourseData(state , action){
            state.fullCourseData = action.payload;
        },
        setTotalLectures(state , action){
            state.totalLectures = action.payload;
        },
        updateCompletedLectures(state , action){
            state.completedLectureData = [...state.completedLectureData , action.payload]
        },
    },
});

export const {
    setCompletedLectureData , 
    setCourseLectureData , 
    setFullCourseData , 
    setTotalLectures , 
    updateCompletedLectures
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer; 