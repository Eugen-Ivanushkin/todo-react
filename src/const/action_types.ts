const ActionTypeCreator = <T extends string>(text: T) => ({
  request: `${text}_REQUEST`,
  success: `${text}_SUCCESS`,
  failed: `${text}_FAILED`,
});
export const TodosLoadedTypes = ActionTypeCreator('TODOS_LOADED');
export const AddTodoTypes = ActionTypeCreator('ADD_TODO');
export const UpdateTodoTypes = ActionTypeCreator('UPDATE_TODO');
export const DeleteTodoTypes = ActionTypeCreator('DELETE_TODO');
export const ClearIsDoneTodoTypes = ActionTypeCreator('CLEAR_ISDONE_TODO');
