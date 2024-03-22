import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "src/app/components/button/button.component";

@Component({
  selector: "app-add-ticket",
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./add-ticket.component.html",
  styleUrl: "./add-ticket.component.css",
})
export class AddTicketComponent {
  @Output() newTicketEvent = new EventEmitter();

  newTicketForm = this.formBuilder.group({
    id: [, Validators.required],
    assigneeId: ["", Validators.required],
    completed: [, Validators.required],
    description: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.newTicketEvent.emit({
      ...this.newTicketForm.value,
      id: Math.round(Math.random() * 1000),
    });
    this.newTicketForm.reset({ assigneeId: "" });
  }
}
