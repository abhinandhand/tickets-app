import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ITicket, IUser } from "src/app/store/ticket/ticket.model";

@Component({
  selector: "app-select-user",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./select-user.component.html",
  styleUrl: "./select-user.component.css",
})
export class SelectUserComponent {
  selectedUserId: number;
  private _users: IUser[];

  @Input({ required: true })
  get users(): IUser[] {
    return this._users;
  }

  set users(users: IUser[]) {
    this._users = users;
    this.selectedUserId = this.ticket.assigneeId;
  }

  @Input({ required: true }) ticket!: ITicket;

  @Output() newAssigneeEvent = new EventEmitter<IUser>();

  onUserChange(user: IUser) {
    this.newAssigneeEvent.emit(user);
  }
}
