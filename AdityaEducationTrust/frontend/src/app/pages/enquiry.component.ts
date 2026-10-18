
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { COLLEGES } from '../college-data';
import { ApiService } from '../core/api.service';
import { Enquiry } from '../models';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="eyebrow">LETS CONNECT</div>
        <h1>{{ isContact ? 'Contact the trust.' : 'Take the next step.' }}</h1>
        <p>
          Send an enquiry and the relevant institution can guide you on current programs and admissions.
        </p>

        <div class="breadcrumb">
          <a routerLink="/">Home</a>
          <span>/</span>
          <span>{{ isContact ? 'Contact' : 'Admissions' }}</span>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container form-layout">
        <div class="form-intro">
          <div class="eyebrow eyebrow-dark">ENQUIRY FORM</div>
          <h2>Tell us what you’re <em>looking for.</em></h2>
          <p>
            Choose a college and share a few details. Do not submit sensitive documents or financial information through this form.
          </p>

          <div class="contact-point">
            <span>01</span>
            <div>
              <strong>Choose your college</strong>
              <p>Send your question to the relevant institution.</p>
            </div>
          </div>

          <div class="contact-point">
            <span>02</span>
            <div>
              <strong>Confirm official details</strong>
              <p>Course availability, fees and deadlines must be confirmed by the college.</p>
            </div>
          </div>

          <div class="contact-point">
            <span>03</span>
            <div>
              <strong>Follow up directly</strong>
              <p>Keep your enquiry details for reference when contacting the institution.</p>
            </div>
          </div>
        </div>

        <form class="enquiry-form" (ngSubmit)="submit()" #form="ngForm">
          <div class="form-heading">
            <h3>Admission / General Enquiry</h3>
            <p>Fields marked * are required.</p>
          </div>

          <div class="form-grid">
            <label>
              Full name *
              <input
                name="name"
                [(ngModel)]="data.name"
                required
                minlength="2"
                autocomplete="name"
                placeholder="Your full name"
              />
            </label>

            <label>
              Mobile number *
              <input
                name="phone"
                [(ngModel)]="data.phone"
                required
                pattern="[0-9+() -]{8,18}"
                autocomplete="tel"
                placeholder="Your phone number"
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                name="email"
                [(ngModel)]="data.email"
                required
                autocomplete="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Interested college *
              <select name="collegeSlug" [(ngModel)]="data.collegeSlug" required>
                <option value="">Select a college</option>
                <option *ngFor="let college of colleges" [value]="college.slug">
                  {{ college.name }}
                </option>
              </select>
            </label>

            <label>
              Interested course
              <input
                name="course"
                [(ngModel)]="data.course"
                placeholder="Course / program"
              />
            </label>

            <label>
              Previous qualification
              <select name="qualification" [(ngModel)]="data.qualification">
                <option value="">Select qualification</option>
                <option>Class 10</option>
                <option>Class 12</option>
                <option>Diploma</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Academic year
              <select name="academicYear" [(ngModel)]="data.academicYear">
                <option value="">Select year</option>
                <option>2026–2027</option>
                <option>2027–2028</option>
                <option>Other / not sure</option>
              </select>
            </label>

            <label class="full-field">
              Your message
              <textarea
                name="message"
                [(ngModel)]="data.message"
                rows="4"
                maxlength="1500"
                placeholder="How can we help?"
              ></textarea>
            </label>
          </div>

          <label class="consent">
            <input
              type="checkbox"
              name="consent"
              [(ngModel)]="consent"
              required
            />
            <span>I agree that my details may be used to respond to this enquiry.</span>
          </label>

          <p class="form-error" *ngIf="error">{{ error }}</p>
          <p class="form-success" *ngIf="success">{{ success }}</p>

          <button
            class="btn btn-dark btn-full"
            type="submit"
            [disabled]="submitting || !form.valid || !consent"
          >
            {{ submitting ? 'Submitting…' : 'Submit enquiry' }}
            <span>→</span>
          </button>

          <small class="form-footnote">
            This form requires the backend to be running to store an enquiry. We do not claim a submission succeeded unless the API confirms it.
          </small>
        </form>
      </div>
    </section>
  `,
})
export class EnquiryComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);

  readonly colleges = COLLEGES;
  isContact = false;
  consent = false;
  submitting = false;
  error = '';
  success = '';

  data: Enquiry = {
    name: '',
    phone: '',
    email: '',
    collegeSlug: '',
    course: '',
    qualification: '',
    academicYear: '2026–2027',
    message: '',
  };

  ngOnInit(): void {
    this.isContact = this.route.snapshot.routeConfig?.path === 'contact';

    const slug = this.route.snapshot.queryParamMap.get('college');

    if (slug) {
      this.data.collegeSlug = slug;
    }
  }

  submit(): void {
    if (this.submitting) {
      return;
    }

    this.error = '';
    this.success = '';
    this.submitting = true;

    this.api.submitEnquiry(this.data).subscribe({
      next: (response) => {
        this.success =
          response.message || 'Your enquiry was submitted successfully.';
        this.resetForm();
        this.submitting = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message ||
          'Could not submit the enquiry. Please ensure the backend is running and try again.';
        this.submitting = false;
      },
    });
  }

  private resetForm(): void {
    this.data = {
      name: '',
      phone: '',
      email: '',
      collegeSlug: this.data.collegeSlug,
      course: '',
      qualification: '',
      academicYear: '2026–2027',
      message: '',
    };

    this.consent = false;
  }
}