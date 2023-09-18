import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { Contact } from "../../../Types/types";

interface ContactItemProps {
    contact: Contact;
    toggleReadStatus: (id: string) => void;
    toggleHandleStatus: (id: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, toggleReadStatus, toggleHandleStatus }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-8">
          <div className="border p-4 shadow flex flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row">
              <div className="flex gap-x-2">
                <button onClick={() => toggleReadStatus(contact._id)} className={`text-xs md:text-base border rounded-lg px-2 py-1 ${contact.isRead ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {contact.isRead ? '既読' : '未読'}
                </button>
                <button onClick={() => toggleHandleStatus(contact._id)} className={`text-xs md:text-base border rounded-lg px-2 py-1 ${contact.isHandled ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {contact.isHandled ? '対処済み' : '未対処'}
                </button>
              </div>
              <div className="md:ml-8 flex flex-col sm:flex-row sm:items-center gap-x-2 md:gap-x-4 text-[6px] md:text-[12px]">
                <p>{contact.storeName}</p>
                <p>{contact.name} 様</p>
                <p>{contact.email}</p>
              </div>
            </div>
          <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow /> }</span>
        </div>
        {isOpen && <div className="py-3 px-4 bg-zinc-300 overflow-hidden text-[6px] md:text-base">
          <div className="break-words whitespace-normal">
            {contact.message}
          </div>
        </div>}
      </div>
    );
};

const AdminContact: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/getAllContacts`)
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error("API Error:", error));
    }, []);

    const toggleReadStatus = (contactId: string) => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/toggleReadStatus/${contactId}`, {
        method: "POST",
      })
      .then(response => response.json())
      .then(updatedContact => {
        const updatedContacts = contacts.map(contact => 
          contact._id === updatedContact._id ? updatedContact : contact
        );
        setContacts(updatedContacts);
      })
      .catch(error => console.error("API Error:", error));
    }
  
    const toggleHandleStatus = (contactId: string) => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/toggleHandleStatus/${contactId}`, {
        method: "POST",
      })
      .then(response => response.json())
      .then(updatedContact => {
        const updatedContacts = contacts.map(contact => 
          contact._id === updatedContact._id ? updatedContact : contact
        );
        setContacts(updatedContacts);
      })
      .catch(error => console.error("API Error:", error));
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div>
                <h3 className="bold">お問い合わせ</h3>
            </div>
            {contacts.map((contact, index) => (
                <ContactItem key={index} contact={contact} toggleReadStatus={toggleReadStatus} toggleHandleStatus={toggleHandleStatus} />
            ))}
        </div>
    );
}

export default AdminContact;

