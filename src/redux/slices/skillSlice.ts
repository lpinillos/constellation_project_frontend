import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISkill } from '@/interfaces/skill.interface';

interface SkillsState {
  selectedSkills: ISkill[];
}

const initialState: SkillsState = {
  selectedSkills: []
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<ISkill>) => {
      state.selectedSkills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.selectedSkills = state.selectedSkills.filter(
        skill => skill.id !== action.payload
      );
    },
    setSkills: (state, action: PayloadAction<ISkill[]>) => {
      state.selectedSkills = action.payload;
    }
  }
});

export const { addSkill, removeSkill, setSkills } = skillsSlice.actions;
export default skillsSlice.reducer;