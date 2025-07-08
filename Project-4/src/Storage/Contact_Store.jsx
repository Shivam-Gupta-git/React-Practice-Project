import { createContext, useEffect, useReducer } from "react";
import { addDoc, collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from '../Config/firebase';


export const ContactList = createContext({
  contactList: [],
  addInitialContactData: () => {},
  addContactList: () => {},
  deleteContactList: () => {},
  searchContact: () => {},
});

const initialState = {
  fullList: [],
  contactList: [],
};


const ContactListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INITIAL_CONTACT_DATA':
      return {
        ...state,
        fullList: action.payload.contacts,
        contactList: action.payload.contacts,
      };

    case 'SEARCH_CONTACT':
      const query = action.payload.searchContactItem.toLowerCase();
      const filtered = state.fullList.filter(contact =>
        contact.name.toLowerCase().includes(query)
      );
      return {
        ...state,
        contactList: filtered,
      };

    default:
      return state;
  }
};

const ContactListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ContactListReducer, initialState);

  const addInitialContactData = (contacts) => {
    dispatch({
      type: 'ADD_INITIAL_CONTACT_DATA',
      payload: { contacts },
    });
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        const snapshot = await getDocs(contactsRef);
        const contactsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        addInitialContactData(contactsList);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const addContactList = async (name, email, number) => {
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        number,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactList = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
    } catch (error) {
      console.log(error);
    }
  };

  const searchContact = (searchContactItem) => {
    dispatch({
      type: 'SEARCH_CONTACT',
      payload: { searchContactItem },
    });
  };

  return (
    <ContactList.Provider
      value={{
        contactList: state.contactList,
        addInitialContactData,
        addContactList,
        deleteContactList,
        searchContact,
      }}
    >
      {children}
    </ContactList.Provider>
  );
};

export default ContactListProvider;