import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { postData } from "../../../services/apiService";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setContactData } from "../../../store/reducer/contact.reducer";
import Meta from "antd/es/card/Meta";

const ContactAdd: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contactData = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.contacts.contactData
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: string) => {
      switch (field) {
        case "firstName":
          dispatch(
            setContactData({ ...contactData, firstName: e.target.value })
          );
          break;
        case "lastName":
          dispatch(
            setContactData({ ...contactData, lastName: e.target.value })
          );
          break;
        case "age":
          dispatch(
            setContactData({ ...contactData, age: Number(e.target.value) })
          );
          break;
        case "photo":
          dispatch(setContactData({ ...contactData, photo: e.target.value }));
          break;
        default:
          break;
      }
    },
    [contactData, dispatch]
  );

  const success = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "Success!",
    });
  }, [messageApi]);

  const error = useCallback(() => {
    messageApi.open({
      type: "error",
      content: "Error!",
    });
  }, [messageApi]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      if (contactData.photo) {
        try {
          await postData("/contact", contactData);
          success();
          setTimeout(() => navigate("/contact/list"), 1000);
        } catch (err) {
          error();
          console.error("Error adding item:", error);
        }
      }
      setIsLoading(false);
    },
    [contactData, error, navigate, success]
  );

  return (
    <div
      style={{ paddingTop: "10%", display: "flex", justifyContent: "center" }}
    >
      <Card title="Add New Contact" style={{ width: "80rem" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col span={3}>
              <label htmlFor="firstName">First Name</label>
            </Col>
            <Col>
              <input
                type="text"
                id="firstName"
                value={contactData?.firstName}
                onChange={(e) => handleChange(e, "firstName")}
                required
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col span={3}>
              <label htmlFor="lastName">Last Name</label>
            </Col>
            <Col>
              <input
                type="text"
                id="lastName"
                value={contactData?.lastName}
                onChange={(e) => handleChange(e, "lastName")}
                required
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col span={3}>
              <label htmlFor="age">Age:</label>
            </Col>
            <Col>
              <input
                type="number"
                id="age"
                value={contactData?.age}
                onChange={(e) => handleChange(e, "age")}
                required
              />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col span={3}>
              <label htmlFor="photo">Photo:</label>
            </Col>
            <Col>
              <input
                id="photo"
                value={contactData?.photo}
                onChange={(e) => handleChange(e, "photo")}
                required
              />
            </Col>
          </Row>

          <Meta
            description={
              <div style={{ display: "flex", justifyContent: "end", gap: 15 }}>
                <Button
                  style={{
                    background:
                      "linear-gradient(108.32deg, #62CDCB 24.88%, #4599DB 78.49%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "24px",
                    height: "max-content",
                    alignItems: "end",
                  }}
                  onClick={handleSubmit}
                  loading={isLoading}
                >
                  Save
                </Button>
                <Button
                  style={{
                    background:
                      "linear-gradient(109.6deg, rgb(162, 2, 63) 11.2%, rgb(231, 62, 68) 53.6%, rgb(255, 129, 79) 91.1%)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "24px",
                    height: "max-content",
                    alignItems: "end",
                  }}
                  onClick={() => navigate("/contact/list")}
                >
                  Cancel
                </Button>
              </div>
            }
          />
        </form>
      </Card>
      {contextHolder}
    </div>
  );
};

export default ContactAdd;
