import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISkill } from '@/interfaces/skill.interface';

interface SkillState {
  selectedSkills: ISkill[];
}

const initialState: SkillState = {
  selectedSkills: [],
};

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<ISkill>) => {
      state.selectedSkills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.selectedSkills = state.selectedSkills.filter(skill => skill.id !== action.payload);
    },
    setSkills: (state, action: PayloadAction<ISkill[]>) => {
      state.selectedSkills = action.payload;
    },
  },
});

export const { addSkill, removeSkill, setSkills } = skillSlice.actions;
export default skillSlice.reducer;
