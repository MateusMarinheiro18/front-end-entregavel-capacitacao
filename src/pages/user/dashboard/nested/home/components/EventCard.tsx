import styled from "styled-components";
import { MapPin, Calendar, Clock, PencilSimple, Trash } from "@phosphor-icons/react";

export const EventCard = ({ event, onEdit, onDelete }: any) => {
    return (
        <EventCardStyles>
            <div className="event-header">
                <h2>{event.name}</h2>
            </div>
            <div className="event-info">
                <p>{event.description}</p>
                <div className="icon-row">
                    <MapPin size={20} weight="bold" color="#C13BBE" />
                    <span>{event.location}</span>
                </div>
                <div className="icon-row">
                    <Calendar size={20} weight="bold" color="#C13BBE" />
                    <span>{event.day}/{event.month}</span>
                </div>
                <div className="icon-row">
                    <Clock size={20} weight="bold" color="#C13BBE" />
                    <span>{event.initial_time} - {event.final_time}</span>
                </div>
            </div>
            <div className="event-actions">
                <PencilSimple
                    size={24}
                    weight="bold"
                    onClick={() => onEdit(event._id)}
                    className="edit-icon"
                />
                <Trash
                    size={24}
                    weight="bold"
                    onClick={() => onDelete(event._id)}
                    className="delete-icon"
                />
            </div>
        </EventCardStyles>
    );
};

const EventCardStyles = styled.div`
    font-family: "Poppins", sans-serif;
    background-color: #ffffff;
    border: 1px solid #B407D9;
    border-radius: 10px;
    box-shadow: 0 1px 6px #FF16D4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    position: relative;
    width: 60%;

    .event-header {
        background-color: #C13BBE;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        h2 {
            font-size: 20px;
            margin-bottom: 0px;
            margin-top: 0px;
            margin-left: 5px;
            padding: 5px;
            color: #EEEEEE;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    p {
        margin: 5px;
        font-size: 16px;
        color: #333;
        font-weight: 600;
    }

    .event-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 5px;
        margin-bottom: 10px;


        .icon-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 5px;

            span {
                font-size: 14px;
                color: #555;
            }
        }
    }

    .event-actions {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        gap: 10px;

        .edit-icon,
        .delete-icon {
            cursor: pointer;
            color: #B306D7;
            transition: color 0.3s;

            &:hover {
                color: #4A004A;
            }
        }

        .delete-icon {
            color: #B306D7;

            &:hover {
                color: #4A004A;
            }
        }
    }
`;
