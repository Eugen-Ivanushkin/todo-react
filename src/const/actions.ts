// import { Todo } from "types/todos";

// const ActionTypeCreator = <Type extends string>(text: Type) => ({
//   request: `${text}_REQUEST` as `${Type}_REQUEST`,
//   success: `${text}_SUCCESS` as `${Type}_SUCCESS`,
//   failed: `${text}_FAILED` as `${Type}_FAILED`,
// });

// const UpdateTodoTypes = ActionTypeCreator('UPDATE_TODO');
// const AddTodoTypes = ActionTypeCreator('ADD_TODO');

// export type ActionTypes = typeof UpdateTodoTypes | typeof AddTodoTypes;

// type TodoAddActionRequest = {
//   type: typeof AddTodoTypes['request'];
//   payload: {
//     val: string;
//   };
// }

// type TodoAddActionSuccess = {
//   type: typeof AddTodoTypes['success'];
//   payload: {
//     task: Todo;
//   };
// }

// type AddTodoTypes = TodoAddActionRequest | TodoAddActionSuccess;

// const parseAction = (action: AddTodoTypes) => {
//   switch (action.type) {
//     case 'ADD_TODO_REQUEST': {
//       const { payload } = action;
//       console.log(payload.val)
//       break;
//     }
//     case 'ADD_TODO_SUCCESS': {
//       const { payload } = action;
//       console.log(payload.task.isDone)
//       break;
//     }
//   }
// }

// const action = 'UPDATE_TODO_SUCESS' as ActionTypes['success'] | ActionTypes['request'];
// switch (action) {
//   case ''
// }
