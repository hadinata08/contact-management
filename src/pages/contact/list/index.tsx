import React from "react";
import { useCallback, useEffect, useState } from "react";
import { getData } from "../../../services/apiService";
import { ContactData, ContactDataResponse } from "../../../types/contact.type";
import { Button, Card, Col, Popconfirm, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setContactListData } from "../../../store/reducer/contact.reducer";
import { useNavigate } from "react-router-dom";
import { EditPenIcon, TrashIcon } from "../../../assets";
import "./contact-list.module.css";

const { Meta } = Card;

const ContactList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactListData = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.contacts.contactList
  );
  const [loading, setLoading] = useState(true);

  const getContactData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getData<ContactDataResponse>("/contact");
      dispatch(setContactListData(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, [dispatch]);

  const deleteData = useCallback(
    async (id: number) => {
      try {
        await getData(`/contact/${id}`);
        message.success("Deleted successfully!");
        getContactData();
      } catch (error) {
        message.success("Deleted Error!");
        console.error("Error deleting data:", error);
      }
    },
    [getContactData]
  );

  useEffect(() => {
    getContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-container">
      <div className="title-container">
        <h1 className="title-txt">Contact List</h1>
        <Button className="btn-add" onClick={() => navigate("/contact/add")}>
          Add Contact
        </Button>
      </div>

      <Row className="card-container">
        {contactListData?.data?.map((contact: ContactData) => (
          <Col key={contact.id}>
            <Card
              style={{ width: 240, backgroundColor: "#0E191F", color: "#fff" }}
              loading={loading}
              cover={
                <img
                  alt="example"
                  src={contact.photo}
                  width={240}
                  height={300}
                  className="card-img"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/contact/detail/${contact.id}`)}
                />
              }
            >
              <Meta
                style={{ color: "#fff" }}
                title={`${contact.firstName} ${contact.lastName}`}
                description={
                  <>
                    <p>Age: {contact.age}</p>
                    <div className="description-card">
                      <img
                        src={EditPenIcon}
                        alt="edit"
                        width={25}
                        height={25}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/contact/edit/${contact.id}`)}
                      />
                      <Popconfirm
                        title="Delete this contact"
                        description="Are you sure to delete this contact?"
                        onConfirm={() => deleteData(contact?.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <img
                          src={TrashIcon}
                          alt="delete"
                          width={25}
                          height={25}
                          style={{ cursor: "pointer" }}
                        />
                      </Popconfirm>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactList;
